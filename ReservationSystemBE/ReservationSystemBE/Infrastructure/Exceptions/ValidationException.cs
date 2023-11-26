namespace ReservationSystemBE.Infrastructure.Exceptions;

public class ValidationException : Exception
{
    public string Code { get; set; }
    public ValidationException(string message, string code) : base(message)
    {
        Code = code;
    }
}