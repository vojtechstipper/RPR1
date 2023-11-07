namespace ReservationSystemBE.Application.Allergens.Queries;

public class AllergenDto
{
    public AllergenDto(string id, int code, string name, string description)
    {
        Id = id;
        Code = code;
        Name = name;
        Description = description;
    }

    public string Id { get; set; }
    public int Code { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
}
