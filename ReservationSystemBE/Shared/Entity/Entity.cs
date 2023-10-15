using ReservationSystem.Shared.Util;

namespace ReservationSystem.Shared.Entity
{
    public class Entity
    {
       public string Id { get; set; }

        public Entity()
        {
            Id = IdGenerator.GenerateId();
        }

    }
}
