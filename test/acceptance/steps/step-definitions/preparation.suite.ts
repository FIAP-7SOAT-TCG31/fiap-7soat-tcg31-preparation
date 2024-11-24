import { Given, Suite, Then, When } from '@fiap-burger/acceptance-factory';
import { HttpService } from '@nestjs/axios';
import { strict as assert } from 'assert';
import { randomUUID } from 'crypto';

@Suite()
export class PreparationSuite {
  private targetId: string;

  constructor(private readonly http: HttpService) {}

  @Given('a preparation was requested')
  async createTarget() {
    const res = await this.http.axiosRef.post(
      'http://localhost:5000/v1/preparations',
      {
        orderId: randomUUID(),
        items: ['XBurger'],
      },
    );
    this.targetId = res.data.id;
  }

  @When('a colaborator advances its status')
  async advanceTargetStatus() {
    await this.http.axiosRef.patch(
      `http://localhost:5000/v1/preparations/${this.targetId}/advance`,
    );
  }

  @When('a colaborator advances its status twice')
  async advanceTargetStatusTwice() {
    await this.http.axiosRef.patch(
      `http://localhost:5000/v1/preparations/${this.targetId}/advance`,
    );
    await this.http.axiosRef.patch(
      `http://localhost:5000/v1/preparations/${this.targetId}/advance`,
    );
  }

  @Then('the preparation gets started')
  async verifyStarted() {
    const res = await this.http.axiosRef.get(
      `http://localhost:5000/v1/preparations/${this.targetId}`,
    );

    const targetStatus = res.data.status;
    assert.equal(targetStatus, 'Started');
  }

  @Then('the preparation gets completed')
  async verifyCompleted() {
    const res = await this.http.axiosRef.get(
      `http://localhost:5000/v1/preparations/${this.targetId}`,
    );

    const targetStatus = res.data.status;
    assert.equal(targetStatus, 'Completed');
  }
}
