using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ReservationSystem.Domain.Users;
using ReservationSystem.Shared.DTO;
using ReservationSystemBE.Infrastructure.Persistence;

namespace ReservationSystemBE.Application.Users.Queries;

public class PaginatedUsersQuery : IRequest<PaginatedResult<UserDto>>
{
    public int Page { get; set; } = 1;
    public int Count { get; set; } = 20;
}

public class PaginatedUsersQueryValidator : AbstractValidator<PaginatedUsersQuery>
{
    public PaginatedUsersQueryValidator()
    {
        RuleFor(x => x.Page).GreaterThan(0);
        RuleFor(x => x.Count).GreaterThan(0);
    }
}

public class UserDto
{
    public string FirstName { get; set; }
    public string SecondName { get; set; }
    public string Email { get; set; }
    public bool IsVerified { get; set; }
    public UserRole Role { get; set; }
}

public class PaginatedUsersQueryHandler : IRequestHandler<PaginatedUsersQuery, PaginatedResult<UserDto>>
{
    private readonly ReservationSystemDbContext _context;
    private readonly IMapper _mapper;

    public PaginatedUsersQueryHandler(ReservationSystemDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<PaginatedResult<UserDto>> Handle(PaginatedUsersQuery request, CancellationToken cancellationToken)
    {
        var totalCount = await _context.Users.CountAsync();
        var users = await _mapper.ProjectTo<UserDto>(_context.Users.Skip((request.Page - 1) * request.Count).Take(request.Count)).ToListAsync();
        return new PaginatedResult<UserDto>() { CurrentPage = request.Page, Data = users, TotalCount = totalCount };
    }
}
