using FluentValidation;
using MediatR;
using ReservationSystem.Domain.Users;
using ReservationSystemBE.Application.Services;
using ValidationException = ReservationSystemBE.Infrastructure.Exceptions.ValidationException;

namespace ReservationSystemBE.Application.Users.Commands.ChangePasswordCommand;

public class ChangePasswordCommand : IRequest<string>
{
    public string UserId { get; set; } = string.Empty;
    public string OldPassword { get; set; }
    public string NewPassword { get; set; }
}
public class ChangePasswordCommandValidator : AbstractValidator<ChangePasswordCommand>
{
    public ChangePasswordCommandValidator()
    {
        RuleFor(x => x.OldPassword).NotEmpty();
        RuleFor(x => x.NewPassword).NotEmpty();
        RuleFor(x => x.OldPassword).NotEqual(x => x.NewPassword);
    }
}

public class ChangePasswordCommandHandler : IRequestHandler<ChangePasswordCommand, string>
{
    private readonly IUserService _userService;

    public ChangePasswordCommandHandler(IUserService userService)
    {
        _userService = userService;
    }

    public async Task<string> Handle(ChangePasswordCommand request, CancellationToken cancellationToken)
    {
        User user;
        try
        {
            user = await _userService.ValidateAndGetUserById(request.UserId, request.OldPassword);
        }
        catch (Exception ex)
        {
            throw new ValidationException($"Bad Password or user", "BadLogin");
        }
        await _userService.SetNewPassword(user, request.NewPassword);
        return user.Id;
    }
}
