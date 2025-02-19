using System.Text;
using backend_egov.Context;
using backend_egov.Models;
using egovernace_backend.Models.DTO;
using Microsoft.AspNetCore.Identity; // Import Identity package
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;


namespace backend_egov.Controllers
{
    [Route("api/[controller]")]
    public class CustomersController : Controller
    {
        private readonly AppDbContext dbContext;
        private readonly IPasswordHasher<CustomerModel> passwordHasher;

        public CustomersController(AppDbContext dbContext, IPasswordHasher<CustomerModel> passwordHasher)
        {
            this.dbContext = dbContext;
            this.passwordHasher = passwordHasher;
        }
        [HttpGet]
        public IActionResult GetAllCustomers()
        {
            var customers = dbContext.CustomerModels.ToList();
            return Ok(customers);
        }
        [HttpGet("{id:int}")]
        public IActionResult GetCustomer(int id)
        {
            var customer = dbContext.CustomerModels
                                    .Include(c => c.Branch)         // Include Branch data
                                    .Include(c => c.DemandType)     // Include DemandType data
                                    .FirstOrDefault(c => c.Id == id);

            if (customer == null)
            {
                return NotFound();
            }

            // Remove sensitive data (Password) before sending the response
            var customerProfile = new
            {
                customer.Id,
                customer.Name,
                customer.UserName,
                customer.Contact,
                customer.Address,
                BranchName = customer.Branch?.Name, // Assuming Branch has Name property
                DemandTypeName = customer.DemandType?.Type // Assuming DemandType has Type property
            };

            return Ok(customerProfile);
        }

        [HttpPost]
        public async Task<IActionResult> AddCustomer([FromBody] CustomerDto customerDto)
        {

            var allBranches = await dbContext.BranchModels.Select(b => b.Name).ToListAsync();
            var branch = await dbContext.BranchModels
                .FirstOrDefaultAsync(b => b.Name == customerDto.BranchName);
            Console.WriteLine(customerDto.BranchName);
            if (branch == null)
            {
                return BadRequest("Invalid Branch Name");
            }
            var demandType = await dbContext.DemandTypeModels
                .FirstOrDefaultAsync(d => d.Type == customerDto.DemandTypeName);

            if (demandType == null)
            {
                return BadRequest("Invalid Demand Type Name");
            }
            var newCustomer = new CustomerModel()
            {
                UserName = customerDto.UserName,
                Password = passwordHasher.HashPassword(null, customerDto.Password),
                Name = customerDto.Name,
                Address = customerDto.Address,
                Contact = customerDto.Contact,
                BranchId = branch.Id, 
                DemandTypeId = demandType.Id 
            };
            dbContext.CustomerModels.Add(newCustomer);
            await dbContext.SaveChangesAsync();

            return Ok(newCustomer);
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] CustomerLoginDto login)
        {
            var customer = dbContext.CustomerModels.FirstOrDefault(c => c.UserName == login.UserName);

            if (customer == null)
            {
                return Unauthorized("Invalid username");
            }

            // Verify the entered password against the stored hash
            var result = passwordHasher.VerifyHashedPassword(customer, customer.Password, login.Password);

            if (result == PasswordVerificationResult.Failed)
            {
                return Unauthorized("Invalid username or password");
            }

            // Store user data in the session
            HttpContext.Session.SetString("UserName", customer.UserName);
            HttpContext.Session.SetString("Name", customer.Name);
            HttpContext.Session.SetInt32("CustomerId", customer.Id);
            HttpContext.Session.SetString("Role", "customer");

            Console.WriteLine("Session CustomerId: " + HttpContext.Session.GetInt32("CustomerId"));


            return Ok(new
            {
                UserName = customer.UserName,
                Name = customer.Name,
                CustomerId = customer.Id
            });
        }
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            // Clear session data
            HttpContext.Session.Clear();

            return Ok("User logged out successfully");
        }
        [HttpGet("payments")]
        public IActionResult GetPayments()
        {
            var customerId = HttpContext.Session.GetInt32("CustomerId");

            if (customerId == null)
            {
                return Unauthorized("User not logged in");
            }

            var payments = dbContext.PaymentHistories
                                    .Include(p => p.Bill) 
                                    .Where(p => p.Bill != null && p.Bill.CustomerId == customerId)
                                    .Select(p => new
                                    {
                                        p.Id,
                                        p.BillId,
                                        p.PaymentDate,
                                        p.AmountPaid,
                                        BillDetails = new
                                        {
                                            p.Bill.IssueDate,
                                            p.Bill.DueDate,
                                            p.Bill.UnitsConsumed,
                                            p.Bill.Fine,
                                            p.Bill.Discount,
                                            p.Bill.TotalAmount,
                                            p.Bill.Status
                                        }
                                    })
                                    .ToList();
            return Ok(payments);
        }

        [HttpGet("bills")]
        public IActionResult GetBills()
        {
            // Retrieve CustomerId from session
            var customerId = HttpContext.Session.GetInt32("CustomerId");
            Console.WriteLine("Customer ID: " + customerId);
            if (customerId == null)
            {
                return Unauthorized("User not logged in");
            }

            // Fetch the payments for the logged-in customer
            var payments = dbContext.BillModels
                                    .Where(p => p.CustomerId == customerId)
                                    .ToList();

            return Ok(payments);
        }
        [HttpGet("branches")]
        public IActionResult GetAllBranches()
        {
            var branches = dbContext.BranchModels.ToList();
            return Ok(branches);
        }
        [HttpGet("demandTypes")]
        public IActionResult GetAllDemandTypes()
        {
            var demandTypes = dbContext.DemandTypeModels.ToList();
            return Ok(demandTypes);
        }
        [HttpPost("bills/payment")]
        public async Task<IActionResult> PayBill([FromBody] PaymentDto paymentDto)
        {
            Console.WriteLine("Reaches here");
            Console.WriteLine();
            Console.WriteLine();

            var customerId = HttpContext.Session.GetInt32("CustomerId");
            Console.WriteLine(customerId);
            if (customerId == null)
            {
                return Unauthorized("User not logged in");
            }
            // Find the bill using the given BillId
            var bill = await dbContext.BillModels.FirstOrDefaultAsync(b => b.Id == paymentDto.BillId);
            if (bill == null)
            {
                return BadRequest("Invalid Bill Id");
            }
            // Calculate the amount paid by adding fine and deducting discount
            decimal amountPaid = bill.TotalAmount + bill.Fine - bill.Discount;
            //// Create a new PaymentHistory record
            var payment = new PaymentHistory()
            {
                BillId = paymentDto.BillId,
                PaymentDate = DateOnly.FromDateTime(DateTime.Now),
                AmountPaid = amountPaid
            };
            dbContext.PaymentHistories.Add(payment);

            // Update the bill status to 'Paid'
            bill.Status = "Paid";

            await dbContext.SaveChangesAsync();

            var url = "https://dev.khalti.com/api/v2/epayment/initiate/";

            var payload = new
            {
                return_url = "http://localhost:5173/user-dashboard/payments",
                website_url = "http://localhost:5173/",
                amount = 2000,
                purchase_order_id = "Order01",
                purchase_order_name = "test",
                customer_info = new
                {
                    name = "Ram Bahadur",
                    email = "test@khalti.com",
                    phone = "9800000123"
                }
            };

            var jsonPayload = JsonConvert.SerializeObject(payload);
            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

            var client = new HttpClient();
            client.DefaultRequestHeaders.Add("Authorization", "key 692aa803490047268d344027209ed08e");
            try
            {
                var response = await client.PostAsync(url, content);
                var responseContent = await response.Content.ReadAsStringAsync();
                return Ok(responseContent);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Payment failed");
            }

        }
    }
}
