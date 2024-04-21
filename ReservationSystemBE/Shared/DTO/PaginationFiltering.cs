namespace ReservationSystem.Shared.DTO;

public class PaginationFiltering
{
    public int Page { get; set; } = 1;
    public int Count { get; set; } = 20;
    public string Filter { get; set; } = string.Empty;
    public string OrderBy { get; set; } = string.Empty;
    public bool? DescendingOrder { get; set; } = false;
}
