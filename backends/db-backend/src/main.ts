import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'
import {useContainer} from 'class-validator'


const bootstrap = async () => {
    const app = await NestFactory.create(AppModule)

    app.setGlobalPrefix('api')

    useContainer(app.select(AppModule), {fallbackOnErrors: true})

    const options = new DocumentBuilder()
        .setTitle('Sudoku solver API')
        .setDescription('Sudoku solver API documentation')
        .setVersion('1.0')
        .build()

    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('api', app, document)

    await app.listen(process.env.APP_PORT || 4000)
        .then(() => console.log(`Server has started on port ${process.env.APP_PORT || 4000}`))
}

void bootstrap()

