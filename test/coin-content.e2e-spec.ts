import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import {CreateCoinContentDto} from '../src/coin-content/dto/create-coin-content.dto';
import {CoinContent} from '../src/coin-content/coin-content.model/coin-content.model';
//import {disconnect} from 'mongoose';

const data: CoinContent[] = [{
	title: 'Test title',
	links: [{
		id: 1,
		title: 'Tests title card',
		url: 'http',
		thumbnailUrl: 'http'
	}]
}]

const testDto: CreateCoinContentDto = {
	idCoin: 'testCoin',
	symbol: 'TC',
	data
}

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;

  beforeEach(async () => {
	const moduleFixture: TestingModule = await Test.createTestingModule({
		imports: [AppModule],
	}).compile();

	app = moduleFixture.createNestApplication();
	await app.init();
  });

  it('/coin-content/create (POST)', async () => {
	return request(app.getHttpServer())
		.post('/coin-content/create')
		.send(testDto)
		.expect(201)
		.then(({body}: request.Response) => {
			console.log(body);
			createdId = body.id;
			expect(createdId).toBeDefined()
		})
  });

  it('/coin-content/:idCoin (GET)', () => {
	  return request(app.getHttpServer())
		  .get('/coin-content/' + testDto.idCoin)
		  .expect(200)
		  .then(({body}: request.Response)=>{
			  createdId = body.idCoin
		  })
  })

	it('/coin-content/:id (DELETE) - id', () => {
		return request(app.getHttpServer())
			.delete(`/coin-content/${createdId}`)
			.expect(200)
	})

  it('/coin-content/:id (DELETE) - hax', () => {
	  return request(app.getHttpServer())
		  .delete(`/coin-content/:non`)
		  .expect(404)
  })

  afterAll(() => {
	  //disconnect()

  })
});
