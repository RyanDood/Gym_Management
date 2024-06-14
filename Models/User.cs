using System.ComponentModel.DataAnnotations;

namespace Gym_Management.Models
{
    public class User
    {
        [Key]
        public int UserID { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public bool isAdmin { get; set; }

        public User()
        {
        }

        public User(int userID, string userName, string password, string email, bool isAdmin)
        {
            UserID = userID;
            UserName = userName;
            Password = password;
            Email = email;
            this.isAdmin = isAdmin;
        }
    }
}
