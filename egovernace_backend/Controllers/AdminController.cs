using backend_egov.Context;
using backend_egov.Models;
using egovernace_backend.Models.DTO;
using Microsoft.AspNetCore.Identity; // Import Identity package
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace backend_egov.Controllers
{
    [Route("api/[controller]")]
    public class AdminController : Controller
    {
        private readonly AppDbContext dbContext;
        private readonly IPasswordHasher<CustomerModel> passwordHasher;

        public AdminController(AppDbContext dbContext, IPasswordHasher<CustomerModel> passwordHasher)
        {
            this.dbContext = dbContext;
            this.passwordHasher = passwordHasher;
        }

        [HttpPost("bill")]
        public async Task<IActionResult> CreateBills([FromBody] BillModel bill)
        {
            Console.WriteLine(JsonConvert.SerializeObject(bill));
            var customer = await dbContext.CustomerModels
                .Include(c => c.DemandType)
                .FirstOrDefaultAsync(c => c.Id == bill.CustomerId);

            if (customer == null || customer.DemandType == null)
            {
                return NotFound("Customer or Demand Type not found.");
            }
            var rate = await dbContext.RateModels
                .FirstOrDefaultAsync(r => r.DemandTypeModelId == customer.DemandTypeId);
            if (rate == null)
            {
                return NotFound("Rate for the customer's demand type not found.");
            }
            decimal totalAmount = bill.UnitsConsumed * rate.RatePerUnit;
            decimal fineAmount = 0m;
            decimal discountAmount = 0m;
            DateOnly currentDate = DateOnly.FromDateTime(DateTime.Now);
            if (bill.DueDate < currentDate)
            {
                fineAmount = totalAmount * 0.02m; // 2% fine
                totalAmount += fineAmount;
            }
            int daysSinceIssue = (currentDate.ToDateTime(TimeOnly.MinValue) - bill.IssueDate.ToDateTime(TimeOnly.MinValue)).Days;
            if (daysSinceIssue <= 20)
            {
                discountAmount = totalAmount * 0.03m; // 3% discount
                totalAmount -= discountAmount;
            }
            var newCustomerBill = new BillModel()
            {
                DueDate = bill.DueDate,
                UnitsConsumed = bill.UnitsConsumed,
                Fine = fineAmount,
                Discount = discountAmount,
                CustomerId = bill.CustomerId,
                TotalAmount = totalAmount
            };
            dbContext.BillModels.Add(newCustomerBill);
            var savedDetails = await dbContext.SaveChangesAsync();
            return Ok(savedDetails);
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] AdminModel login)
        {
            Console.WriteLine(JsonConvert.SerializeObject(login));
            var admin = await dbContext.AdminModels.FirstOrDefaultAsync(c => c.Username == login.Username);

            if (admin == null)
            {
                return Unauthorized("Invalid username");
            }

            // Verify the entered password against the stored hash
            var result = String.Equals(admin.Password, login.Password);

            if (!result)
            {
                return Unauthorized("Invalid username or password");
            }

            // Store user data in the session
            HttpContext.Session.SetString("UserName", admin.Username);
            HttpContext.Session.SetInt32("CustomerId", admin.Id);
            HttpContext.Session.SetString("Role", "admin");

            return Ok(new
            {
                UserName = admin.Username,
                CustomerId = admin.Id
            });
        }
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            // Clear session data
            HttpContext.Session.Clear();

            return Ok("Admin user logged out successfully");
        }
        [HttpPost("branch")]
        public IActionResult CreateBranch([FromBody] BranchModel branch)
        {
            // Retrieve CustomerId from session
            var customerId = HttpContext.Session.GetInt32("CustomerId");

            if (customerId == null)
            {
                return Unauthorized("User not logged in");
            }

            var newBranch = new BranchModel()
            {
                Name = branch.Name,
            };

            return Ok(newBranch);
        }
        [HttpPost("rate")]
        public async Task<IActionResult> AddRate([FromBody] RateDto rateDto)
        {

            if (string.IsNullOrWhiteSpace(rateDto.DemandTypeName) || rateDto.RatePerUnit <= 0)
            {
                return BadRequest("Invalid demand type name or rate value.");
            }
            var demandType = await dbContext.DemandTypeModels
                .FirstOrDefaultAsync(dt => dt.Type == rateDto.DemandTypeName);

            if (demandType == null)
            {
                return NotFound("Demand type not found.");
            }
            var newRate = new RateModel
            {
                DemandTypeModelId = demandType.Id,
                RatePerUnit = rateDto.RatePerUnit
            };

            dbContext.RateModels.Add(newRate);
            await dbContext.SaveChangesAsync();

            return Ok(newRate);
        }
        [HttpPost("demand-type")]
        public async Task<IActionResult> AddDemandType([FromBody] DemandTypeModel demandType)
        {
            // Validate input
            if (string.IsNullOrWhiteSpace(demandType.Type))
            {
                return BadRequest("Demand type cannot be empty.");
            }

            // Create and save new DemandTypeModel
            var newDemandType = new DemandTypeModel
            {
                Type = demandType.Type
            };

            dbContext.DemandTypeModels.Add(newDemandType);
            await dbContext.SaveChangesAsync();

            return Ok(newDemandType);
        }

        [HttpGet("demand-types")]
        public async Task<IActionResult> GetAllDemandTypes()
        {
            var demandTypes = await dbContext.DemandTypeModels.OrderBy(d => d.Type).ToListAsync();

            if (!demandTypes.Any())
            {
                return NotFound("No demand types found.");
            }

            return Ok(demandTypes);
        }
        [HttpGet("generate-report")]
        public async Task<IActionResult> GetReport()
        {
            var bills = await dbContext.BillModels  // The ! is used to assert that b.Customer is not null when accessing its Branch property.
                .Include(b => b.Customer) // Include Customer details
                .ThenInclude(c => c!.DemandType) // Include DemandType details
                .Include(b => b.Customer!.Branch) // Include Branch details
                .ToListAsync();

            if (!bills.Any())
            {
                return NotFound("No bills found.");
            }

            var report = new
            {
                // Number of customers in each demand type
                CustomersByDemandType = bills
                    .GroupBy(b => b.Customer?.DemandType?.Type)
                    .Select(g => new
                    {
                        DemandType = g.Key,
                        CustomerCount = g.Select(b => b.Customer).Distinct().Count()
                    })
                    .ToList(),

                // Number of customers in each branch
                CustomersByBranch = bills
                    .GroupBy(b => b?.Customer?.Branch?.Name)
                    .Select(g => new
                    {
                        Branch = g.Key,
                        CustomerCount = g.Select(b => b.Customer).Distinct().Count()
                    })
                    .ToList(),

                // Number of paid and pending bills
                BillStatusCounts = new
                {
                    PaidBills = bills.Count(b => b.Status == "Paid"),
                    PendingBills = bills.Count(b => b.Status == "Pending")
                },

                // Total revenue generated
                TotalRevenue = bills.Sum(b => b.TotalAmount)
            };

            return Ok(report);
        }

    }
}
