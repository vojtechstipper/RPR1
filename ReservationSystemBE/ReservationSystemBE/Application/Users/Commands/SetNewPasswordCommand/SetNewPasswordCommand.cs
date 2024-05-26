using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ReservationSystem.Domain.Users;
using ReservationSystemBE.Application.Services;
using ReservationSystemBE.Infrastructure.Exceptions;
using ReservationSystemBE.Infrastructure.Persistence;
using ValidationException = ReservationSystemBE.Infrastructure.Exceptions.ValidationException;

namespace ReservationSystemBE.Application.Users.Commands.SetNewPasswordCommand;

public class SetNewPasswordCommand : IRequest<string>
{
    public string UserEmail { get; set; }
    public string PasswordResetCode { get; set; }
    public string NewPassword { get; set; }
}
public class SetPasswordCommandValidator : AbstractValidator<SetNewPasswordCommand>
{ 
    public SetPasswordCommandValidator()
    {
        RuleFor(x => x.UserEmail).NotEmpty().EmailAddress();
        RuleFor(x => x.PasswordResetCode).NotEmpty();
        RuleFor(x => x.NewPassword).MinimumLength(8).NotEmpty();
    }
}

public class SetNewPasswordCommandHandler : IRequestHandler<SetNewPasswordCommand, string>
{
    private readonly ReservationSystemDbContext _reservationSystemDbContext;
    private readonly IUserService _userService;

    public SetNewPasswordCommandHandler(ReservationSystemDbContext reservationSystemDbContext, IUserService userService)
    {
        _reservationSystemDbContext = reservationSystemDbContext;
        _userService = userService;
    }

    public async Task<string> Handle(SetNewPasswordCommand request, CancellationToken cancellationToken)
    {
        var passwordResetCode = await _reservationSystemDbContext.PasswordResetCodes
              .Include(x => x.User)
              .FirstOrDefaultAsync(x => x.Code == request.PasswordResetCode);

        if (passwordResetCode is null || passwordResetCode.User.Email != request.UserEmail)
        {
            throw new ValidationException($"Bad email or code", "BadPasswordResetAttempt");
        }
        await ValidateChangeUserAttempt(passwordResetCode);
        await _userService.SetNewPassword(passwordResetCode.User, request.NewPassword);
        return passwordResetCode.UserId;
    }

    private async Task ValidateChangeUserAttempt(PasswordResetCode passwordResetCode)
    {
        _reservationSystemDbContext.Remove(passwordResetCode);
        await _reservationSystemDbContext.SaveChangesAsync();
        if (passwordResetCode.ValidTill < DateTime.Now)
        {
            throw new ValidationException($"Password reset code expired", "PasswordResetCodeExpired");
        }
    }
}
