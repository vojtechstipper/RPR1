using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ReservationSystemBE.Application.Services;
using ReservationSystemBE.Application.Users.Commands.LoginUserCommand;
using ReservationSystemBE.Application.Users.Queries;
using ReservationSystemBE.Infrastructure.Persistence;
using ValidationException = ReservationSystemBE.Infrastructure.Exceptions.ValidationException;

namespace ReservationSystemBE.Application.Users.Commands.RegisterUserCommand;

public class RegisterUserCommand : IRequest<LoginResponse>
{
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }
}

public class RegisterUserCommandValidator : AbstractValidator<RegisterUserCommand>
{
    public RegisterUserCommandValidator()
    {
        RuleFor(x => x.Name).NotEmpty();
        RuleFor(x => x.Surname).NotEmpty();
        RuleFor(x => x.Password).NotEmpty();
        RuleFor(x => x.Email).EmailAddress();
    }
}

public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, LoginResponse>
{
    private readonly ReservationSystemDbContext _context;
    private readonly IUserService _userService;
    private readonly IAuthService _authService;
    private readonly IMapper _mapper;

    public RegisterUserCommandHandler(ReservationSystemDbContext context, IUserService userService, IAuthService authService)
    {
        _context = context;
        _userService = userService;
        _authService = authService;
    }

    public async Task<LoginResponse> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
    {
        if (await ValidateExistingUserByMail(request.Email))
        {
            throw new ValidationException($"User with email : {request.Email} already exists", "DuplicityUser");
        }

        var newUser = await _userService.CreateUser(request.Email, request.Name, request.Surname, request.Password);
        if (newUser == null) throw new ValidationException($"User could not be created", "FailedCreatinUser");


        return new LoginResponse()
        {
            Token = await _authService.GenerateToken(newUser),
            UserInfo = _mapper.Map<UserDto>(newUser)
        };
    }

    private Task<bool> ValidateExistingUserByMail(string email) =>
     _context.Users.AnyAsync(u => u.Email == email);


}
