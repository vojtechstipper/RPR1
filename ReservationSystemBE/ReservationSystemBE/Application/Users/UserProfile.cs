using AutoMapper;
using ReservationSystem.Domain.Users;
using ReservationSystemBE.Application.Users.Queries;

namespace ReservationSystemBE.Application.Users;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<User, UserDto>();
    }
}
