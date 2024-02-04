using MediatR;

namespace ReservationSystemBE.Application.Orders.Queries;

public record GetTimesForOrderQuery : IRequest<List<OrderTimesDropdownDto>>;

public class OrderTimesDropdownDto
{
    public DateTime Time { get; set; }
}

public class GetTimesForOrderQueryHandler : IRequestHandler<GetTimesForOrderQuery, List<OrderTimesDropdownDto>>
{
    public Task<List<OrderTimesDropdownDto>> Handle(GetTimesForOrderQuery request, CancellationToken cancellationToken)
    {
        DateTime timeNow = DateTime.Now;
        DateTime endTime = DateTime.Today;
        List<DateTime> times = GetTimes(timeNow.AddMinutes(20), endTime.AddHours(18), 10);

        return Task.FromResult(times.Select(x => new OrderTimesDropdownDto() { Time = x }).ToList());
    }

    private List<DateTime> GetTimes(DateTime startTime, DateTime endTime, int minutesInterval)
    {
        List<DateTime> times = new List<DateTime>();

        DateTime currentTime = startTime;

        while (currentTime <= endTime)
        {
            times.Add(currentTime);
            currentTime = currentTime.AddMinutes(minutesInterval);
        }

        return times;
    }
}
