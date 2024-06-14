using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gym_Management.Models
{
    public class Member
    {
        [Key]
        public int MemberID { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public DateTime? MembershipExpiry { get; set; } = DateTime.Now.AddMonths(6);
        public DateTime? DateOfJoining { get; set;} = DateTime.Now;
        public int UserID {  get; set; }
        [ForeignKey("UserID")]
        public User? User { get; set; }

        public Member()
        {
        }

        public Member(int memberID, string name, string phone, DateTime membershipExpiry, DateTime dateOfJoining, int userID)
        {
            MemberID = memberID;
            Name = name;
            Phone = phone;
            MembershipExpiry = membershipExpiry;
            DateOfJoining = dateOfJoining;
            UserID = userID;
        }
    }
}
