using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ReservationSystemBE.Application.Services;
using ReservationSystemBE.Infrastructure.Persistence;
using ValidationException = ReservationSystemBE.Infrastructure.Exceptions.ValidationException;

namespace ReservationSystemBE.Application.Users.Commands.RegisterUserCommand;

public class RegisterUserCommand : IRequest<string>
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

public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, string>
{
    private readonly ReservationSystemDbContext _context;
    private readonly IUserService _userService;

    public RegisterUserCommandHandler(ReservationSystemDbContext context, IUserService userService)
    {
        _context = context;
        _userService = userService;
    }

    public async Task<string> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
    {
        if (await ValidateExistingUserByMail(request.Email))
        {
            throw new ValidationException($"User with email : {request.Email} already exists", "DuplicityUser");
        }

        var newUser = await _userService.CreateUser(request.Email, request.Name, request.Surname, request.Password);
        if (newUser == null) throw new ValidationException($"User could not be created", "FailedCreatinUser");
        return newUser.Id;
    }

    private Task<bool> ValidateExistingUserByMail(string email) =>
     _context.Users.AnyAsync(u => u.Email == email);


}
