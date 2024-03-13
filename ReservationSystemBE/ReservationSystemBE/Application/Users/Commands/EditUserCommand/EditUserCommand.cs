using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ReservationSystemBE.Infrastructure.Exceptions;
using ReservationSystemBE.Infrastructure.Persistence;
using ValidationException = ReservationSystemBE.Infrastructure.Exceptions.ValidationException;

namespace ReservationSystemBE.Application.Users.Commands.EditUserCommand;

public class EditUserCommand : IRequest<string>
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Email { get; set; }
}

public class EditUserCommandValidator : AbstractValidator<EditUserCommand>
{
    public EditUserCommandValidator()
    {
        RuleFor(x => x.Name).NotEmpty();
        RuleFor(x => x.Surname).NotEmpty();
        RuleFor(x => x.Email).EmailAddress();
    }
}

public class EditUserCommandHandler : IRequestHandler<EditUserCommand, string>
{
    private readonly ReservationSystemDbContext _context;

    public EditUserCommandHandler(ReservationSystemDbContext context)
    {
        _context = context;
    }

    public async Task<string> Handle(EditUserCommand request, CancellationToken cancellationToken)
    {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == request.Id);
        if (user is null)
        {
            throw new ValidationException($"Entity not found with Id: {request.Id}", "EntityNotFound");
        }

        user.Email=request.Email;
        user.FirstName = request.Name;
        user.SecondName = request.Surname;

        _context.Update(user);
        await _context.SaveChangesAsync();
        return user.Id;
    }
}
