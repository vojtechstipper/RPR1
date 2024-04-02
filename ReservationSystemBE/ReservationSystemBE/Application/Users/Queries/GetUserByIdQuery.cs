using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ReservationSystem.Shared.Exceptions;
using ReservationSystemBE.Infrastructure.Exceptions;
using ReservationSystemBE.Infrastructure.Persistence;

namespace ReservationSystemBE.Application.Users.Queries;

public record GetUserByIdQuery(string Id) : IRequest<UserDto>;

public class getUserByIdQueryHandler : IRequestHandler<GetUserByIdQuery, UserDto>
{
    private readonly ReservationSystemDbContext _context;
    private readonly IMapper _mapper;

    public getUserByIdQueryHandler(ReservationSystemDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<UserDto> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
    {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == request.Id);
        if (user == null)
            throw new ValidationException($"User with Id: {request.Id} was not found", ExceptionCodes.EntityNotFound);

        return _mapper.Map<UserDto>(user);
    }
}
