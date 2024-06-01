using MediatR;
using Microsoft.EntityFrameworkCore;
using ReservationSystem.Shared.Exceptions;
using ReservationSystemBE.Infrastructure.Exceptions;
using ReservationSystemBE.Infrastructure.Persistence;

namespace ReservationSystemBE.Application.Users.Commands;

public record DeactivateUserByIdCommand(string Id) : IRequest<Unit>;


public class DeactivateUserByIdCommandHandler : IRequestHandler<DeactivateUserByIdCommand, Unit>
{
    private readonly ReservationSystemDbContext _context;

    public DeactivateUserByIdCommandHandler(ReservationSystemDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(DeactivateUserByIdCommand request, CancellationToken cancellationToken)
    {
        var user = await _context.Users.Where(x => x.Id == request.Id).FirstOrDefaultAsync();
        if (user == null)
            throw new ValidationException($"User with Id: {request.Id} was not found", ExceptionCodes.EntityNotFound);

        user.Active = false;
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
        return Unit.Value;
    }
}
