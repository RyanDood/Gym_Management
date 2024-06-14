using Gym_Management.Models;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Model;

namespace Gym_Management.Context
{
    public class GymManagementContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Member> Members { get; set; }

        public GymManagementContext(DbContextOptions options) : base(options)
        {

        }
    }
}
