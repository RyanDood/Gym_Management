namespace Gym_Management.Exceptions
{
    public class PasswordMismatchException : Exception
    {
        public PasswordMismatchException(string? message) : base(message)
        {
        }
    }
}
