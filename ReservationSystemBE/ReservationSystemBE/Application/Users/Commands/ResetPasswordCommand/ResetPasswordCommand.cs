using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ReservationSystem.Domain.Users;
using ReservationSystemBE.Application.Services;
using ReservationSystemBE.Infrastructure.Persistence;
using System.Text;

namespace ReservationSystemBE.Application.Users.Commands.ResetPasswordCommand;

public class ResetPasswordCommand : IRequest<string>
{
    public string UserEmail { get; set; }
}
public class ResetPasswordCommandValidator : AbstractValidator<ResetPasswordCommand>
{
    public ResetPasswordCommandValidator()
    {
        RuleFor(x => x.UserEmail).NotEmpty().EmailAddress();
    }
}

public class ResetPasswordCommandHandler : IRequestHandler<ResetPasswordCommand, string>
{
    private readonly ReservationSystemDbContext _context;
    private readonly IEmailNotifier _notifier;

    public ResetPasswordCommandHandler(ReservationSystemDbContext context, IEmailNotifier notifier)
    {
        _context = context;
        _notifier = notifier;
    }

    public async Task<string> Handle(ResetPasswordCommand request, CancellationToken cancellationToken)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.UserEmail);
        if (user == null)
        {
            //vrací se OK, aby nedošlo k útoku na maily
            return "";
        }

        string code = GeneratedCode();

        PasswordResetCode passwordResetCode = new()
        {
            Code = code,
            ValidTill = DateTime.Now.AddMinutes(30),
            User = user
        };
        await _context.PasswordResetCodes.AddAsync(passwordResetCode);
        await _context.SaveChangesAsync();
        await _notifier.SendPassworResetEmail(user.Email, code);
        return "";
    }

    private string GeneratedCode()
    {
        Random random = new Random();

        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        StringBuilder stringBuilder = new StringBuilder();

        for (int i = 0; i < 6; i++)
        {
            stringBuilder.Append(chars[random.Next(chars.Length)]);
        }

        return stringBuilder.ToString();
    }
}
