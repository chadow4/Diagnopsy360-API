import { UserDto } from "../user/user.dto";
import { TreatmentDto } from "../treatment/treatment.dto";
import { UserEntity } from "../user/user.entity";
import { TreatmentEntity } from "../treatment/treatment.entity";


export const toUserDto = (data: UserEntity): UserDto => {
  const { id, firstname, lastname, email, role} = data;
  return <UserDto><unknown>{
    id,
    firstname,
    lastname,
    email,
    role
  };
};

export const toTreatmentDto = (data: TreatmentEntity): TreatmentDto => {
  const { id, name} = data;
  return <TreatmentDto><unknown>{
    id,
    name
  };
};

