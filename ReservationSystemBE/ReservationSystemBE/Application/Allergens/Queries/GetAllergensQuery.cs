using MediatR;
using Microsoft.EntityFrameworkCore;
using ReservationSystemBE.Infrastructure.Persistence;

namespace ReservationSystemBE.Application.Allergens.Queries;

public class GetAllergensQuery : IRequest<List<AllergenDto>>
{
}

public class GetAllergensQueryHandler : IRequestHandler<GetAllergensQuery, List<AllergenDto>>
{
    private readonly ReservationSystemDbContext _context;

    public GetAllergensQueryHandler(ReservationSystemDbContext context)
    {
        _context = context;
    }

    public async Task<List<AllergenDto>> Handle(GetAllergensQuery request, CancellationToken cancellationToken)
    {
        var allergens = await _context.Allergens.Select(x => new AllergenDto(x.Id, x.Code, x.Name, x.Description)).ToListAsync();
        return allergens;
    }
}
