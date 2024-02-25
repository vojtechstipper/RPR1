using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ReservationSystemBE.Infrastructure.Persistence;

namespace ReservationSystemBE.Application.Allergens.Queries;

public record GetAllergensDropDownQuery : IRequest<List<AllergenDropDownDto>>;

public class GetAllergensDropDownQueryHandler : IRequestHandler<GetAllergensDropDownQuery, List<AllergenDropDownDto>>
{
    private readonly ReservationSystemDbContext _dbContext;
    private readonly IMapper _mapper;

    public GetAllergensDropDownQueryHandler(ReservationSystemDbContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public async Task<List<AllergenDropDownDto>> Handle(GetAllergensDropDownQuery request, CancellationToken cancellationToken)
    {
        return await _dbContext.Allergens.Select(x => new AllergenDropDownDto { Id = x.Id, Name = x.Name }).ToListAsync();
    }
}