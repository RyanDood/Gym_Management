namespace Gym_Management.Exceptions
{
    public class UserNameNotFoundException : Exception
    {
        public UserNameNotFoundException(string? message) : base(message)
        {
        }
    }
}
