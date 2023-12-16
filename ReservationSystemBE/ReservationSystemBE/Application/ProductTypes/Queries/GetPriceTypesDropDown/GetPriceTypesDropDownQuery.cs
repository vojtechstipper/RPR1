using MediatR;
using Microsoft.EntityFrameworkCore;
using ReservationSystemBE.Infrastructure.Persistence;

namespace ReservationSystemBE.Application.ProductTypes.Queries.GetPriceTypesDropDown;

public class GetPriceTypesDropDownQuery : IRequest<List<ProductTypeDto>>
{
}
public class GetPriceTypesDropDownQueryHandler : IRequestHandler<GetPriceTypesDropDownQuery, List<ProductTypeDto>>
{
    private readonly ReservationSystemDbContext _dbContext;

    public GetPriceTypesDropDownQueryHandler(ReservationSystemDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<ProductTypeDto>> Handle(GetPriceTypesDropDownQuery request, CancellationToken cancellationToken)
    {
        return await _dbContext.ProductTypes.Select(x => new ProductTypeDto(x.Id, x.Name)).ToListAsync();
    }
}