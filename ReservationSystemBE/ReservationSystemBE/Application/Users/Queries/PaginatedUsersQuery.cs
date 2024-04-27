using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ReservationSystem.Domain.Users;
using ReservationSystem.Shared.DTO;
using ReservationSystemBE.Infrastructure.Persistence;

namespace ReservationSystemBE.Application.Users.Queries;

public class PaginatedUsersQuery : PaginationFiltering, IRequest<PaginatedResult<UserDto>>
{
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
    public string Id { get; set; }
    public string FirstName { get; set; }
    public string SecondName { get; set; }
    public string Email { get; set; }
    public bool IsVerified { get; set; }
    public bool IsStudent { get; set; }
    public UserRole Role { get; set; }
    public bool Active { get; set; }
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
        //var totalCount = await _context.Users.CountAsync();
        var usersQuery = _context.Users.AsQueryable();

        if (!string.IsNullOrEmpty(request.Filter))
        {
            usersQuery = usersQuery.Where(x => x.Email.Contains(request.Filter));
        }

        if (!string.IsNullOrEmpty(request.OrderBy))
        {
            switch (request.OrderBy.Trim().ToLower())
            {
                case "email":
                    if (request.DescendingOrder is not null && request.DescendingOrder == true)
                    {
                        usersQuery = usersQuery.OrderByDescending(x => x.Email);
                    }
                    else usersQuery = usersQuery.OrderBy(x => x.Email);
                    break;
                case "role":
                    if (request.DescendingOrder is not null && request.DescendingOrder == true)
                    {
                        usersQuery = usersQuery.OrderByDescending(x => x.Role);
                    }
                    else usersQuery = usersQuery.OrderBy(x => x.Role);
                    break;
                case "active":
                    if (request.DescendingOrder is not null && request.DescendingOrder == true)
                    {
                        usersQuery = usersQuery.OrderByDescending(x => x.Active);
                    }
                    else usersQuery = usersQuery.OrderBy(x => x.Active);
                    break;
                case "isStudent":
                    if (request.DescendingOrder is not null && request.DescendingOrder == true)
                    {
                        usersQuery = usersQuery.OrderByDescending(x => x.IsStudent);
                    }
                    else usersQuery = usersQuery.OrderBy(x => x.IsStudent);
                    break;
                case "secondName":
                    if (request.DescendingOrder is not null && request.DescendingOrder == true)
                    {
                        usersQuery = usersQuery.OrderByDescending(x => x.SecondName);
                    }
                    else usersQuery = usersQuery.OrderBy(x => x.SecondName);
                    break;
            }
        }

        var totalcount = await usersQuery.CountAsync();
        usersQuery = usersQuery.Skip((request.Page - 1) * request.Count).Take(request.Count);

        var users = await _mapper.ProjectTo<UserDto>(usersQuery).ToListAsync();
        return new PaginatedResult<UserDto>() { CurrentPage = request.Page, Data = users, TotalCount = totalcount };
    }
}
