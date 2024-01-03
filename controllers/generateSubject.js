import { faker } from '@faker-js/faker';

//generate sample subject using fakerjs
const generateSubject = () => {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        age: faker.number.int({ min: 18, max: 99 }),
        email: faker.internet.email(),
        haveCreditCard: faker.datatype.boolean()
    }
}

export default generateSubject;