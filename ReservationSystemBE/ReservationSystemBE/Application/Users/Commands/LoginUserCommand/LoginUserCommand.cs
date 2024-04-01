using AutoMapper;
using FluentValidation;
using MediatR;
using ReservationSystemBE.Application.Services;
using ReservationSystemBE.Application.Users.Queries;
using ValidationException = ReservationSystemBE.Infrastructure.Exceptions.ValidationException;

namespace ReservationSystemBE.Application.Users.Commands.LoginUserCommand;

public record LoginUserCommand(string UserName, string Password) : IRequest<LoginResponse>;

public class LoginResponse
{
    public string Token { get; set; }
    public UserDto UserInfo { get; set; }
}

public class LoginUserCommandValidator : AbstractValidator<LoginUserCommand>
{
    public LoginUserCommandValidator()
    {
        RuleFor(x => x.UserName).EmailAddress().NotEmpty();
        RuleFor(x => x.Password).NotEmpty();
    }
}

public class LoginUserCommandHandler : IRequestHandler<LoginUserCommand, LoginResponse>
{
    private readonly IAuthService _authService;
    private readonly IUserService _userService;
    private readonly IMapper _mapper;

    public LoginUserCommandHandler(IAuthService authService, IUserService userService, IMapper mapper)
    {
        _authService = authService;
        _userService = userService;
        _mapper = mapper;
    }

    public async Task<LoginResponse> Handle(LoginUserCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var user = await _userService.ValidateAndGetUser(request.UserName.ToLower().Trim(), request.Password);
            if (user != null)
            {
                var token = await _authService.GenerateToken(user);
                return new LoginResponse()
                {
                    UserInfo = _mapper.Map<UserDto>(user),
                    Token = token
                };
            }
        }
        catch (Exception ex) { throw new ValidationException("Bad Password or user", "BadLogin"); }
        return new LoginResponse();
    }
}