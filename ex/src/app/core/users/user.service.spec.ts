import { TestBed } from '@angular/core/testing'
import {
  ApolloTestingModule,
  ApolloTestingController
} from 'apollo-angular/testing'

import { UserService } from './user.service'
import { AllUsersDocument } from './graphql/users.query.graphql-gen'

describe('UserService', () => {
  let controller: ApolloTestingController
  let service: UserService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApolloTestingModule]
    }).compileComponents()

    TestBed.configureTestingModule({ providers: [UserService] })
  })

  it('should query users from user service', () => {
    controller = TestBed.inject(ApolloTestingController)
    service = TestBed.inject(UserService)
    service.getUsers().subscribe((users) => {
      expect(users[0].firstName).toEqual('test')
      expect(users[0].email).toEqual('test@test.com')
    })

    const op = controller.expectOne(AllUsersDocument)
    expect(op.operation.operationName).toEqual('allUsers')

    op.flush({
      data: {
        users: [
          {
            firstName: 'test',
            lastName: 'user',
            email: 'test@test.com',
            customerEmail: 'customerEmailtest@test.com',
            id: 'testId',
            prefix: 'de'
          }
        ]
      }
    })

    controller.verify()
  })
})
