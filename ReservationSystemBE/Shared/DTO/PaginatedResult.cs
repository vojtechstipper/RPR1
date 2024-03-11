namespace ReservationSystem.Shared.DTO
{
    public class PaginatedResult<T>
    {
        public List<T> Data { get; set; }
        public int TotalCount { get; set; }
        public int CurrentPage { get; set; }
    }
}
