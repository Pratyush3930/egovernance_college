using backend_egov.Models;
using Microsoft.EntityFrameworkCore;

namespace backend_egov.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<AdminModel> AdminModels { get; set; }
        public DbSet<BillModel> BillModels { get; set; }
        public DbSet<BranchModel> BranchModels { get; set; }
        public DbSet<CustomerModel> CustomerModels { get; set; }
        public DbSet<DemandTypeModel> DemandTypeModels { get; set; }
        public DbSet<PaymentHistory> PaymentHistories { get; set; }
        public DbSet<RateModel> RateModels { get; set; }

    }
}
