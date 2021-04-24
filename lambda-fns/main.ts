import addFriend from './addFriend';
import createPerson from './createPerson';
import listFriends from './listFriends';
import ListPersons from './ListPersons';
import Person from './Person';
type AppSyncEvent = {
  info: {
    fieldName: string
  },
  arguments: {
    person: Person
    PersonID: string
    Person1ID: string
    Person2ID: string
  }
}
exports.handler = async (event: AppSyncEvent) => {
  switch (event.info.fieldName) {
    case "addFriend":
      return await addFriend(event.arguments.Person1ID, event.arguments.Person2ID);
    case "ListPersons":
      return await ListPersons();
    case "createPerson":
      return await createPerson(event.arguments.person);
    case "PersonFriends":
      return await listFriends(event.arguments.PersonID);
    default:
      return null;
  }
}