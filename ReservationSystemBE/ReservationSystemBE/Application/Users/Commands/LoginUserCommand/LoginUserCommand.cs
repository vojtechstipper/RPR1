using FluentValidation;
using MediatR;
using ReservationSystemBE.Application.Services;

namespace ReservationSystemBE.Application.Users.Commands.LoginUserCommand;

public record LoginUserCommand(string UserName, string Password) : IRequest<string>;

public class LoginUserCommandValidator : AbstractValidator<LoginUserCommand>
{
    public LoginUserCommandValidator()
    {
        RuleFor(x => x.UserName).EmailAddress().NotEmpty();
        RuleFor(x => x.Password).NotEmpty();
    }
}

public class LoginUserCommandHandler : IRequestHandler<LoginUserCommand, string>
{
    private readonly IAuthService _authService;
    private readonly IUserService _userService;

    public LoginUserCommandHandler(IAuthService authService, IUserService userService)
    {
        _authService = authService;
        _userService = userService;
    }

    public async Task<string> Handle(LoginUserCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var user = await _userService.ValidateAndGetUser(request.UserName.ToLower().Trim(), request.Password);
            if (user != null)
            {
                var token = await _authService.GenerateToken(user);
                return token;
            }
        }
        catch (Exception ex) { throw ex; }
        return "";
    }
}