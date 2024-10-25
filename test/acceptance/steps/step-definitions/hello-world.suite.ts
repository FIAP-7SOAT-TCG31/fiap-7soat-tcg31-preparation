import { Given, Suite, Then, When } from '@fiap-burger/acceptance-factory';
import { HttpService } from '@nestjs/axios';
import { strict as assert } from 'assert';

@Suite()
export class HelloWorldSuite {
  private actualAnswer: string;

  constructor(private readonly http: HttpService) {}

  @Given('I am learning BDD')
  noopGiven() {}

  @When('I make an HTTP Request on the application root path')
  async makeHttpRequest() {
    const res = await this.http.axiosRef.get('http://localhost:3000');
    this.actualAnswer = res.data;
  }

  @Then('it should say {string}')
  verify(expected: string) {
    assert.equal(this.actualAnswer, expected);
  }
}
