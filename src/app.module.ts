import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { GroupModule } from './group/group.module';
import { StudentsModule } from './student/student.module';
import { PayHistoryModule } from './pay-history/pay-history.module';
import { ScheduleModule } from './schedule/schedule.module';
import { GroupStudentModule } from './group-student/group-student.module';
import { PdfsService } from './pdfs/pdfs.service';
import { PdfsModule } from './pdfs/pdfs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      ssl: true,
      extra: {
        decimalNumbers: true,
        trustServerCertificate: true,
        Encrypt: true,
        IntegratedSecurity: false,
      },
      entities: [],
      bigNumberStrings: false,
      synchronize: true,
      autoLoadEntities: true,
    }),

    UsersModule,
    AuthModule,
    CourseModule,
    GroupModule,
    StudentsModule,
    PayHistoryModule,
    ScheduleModule,
    GroupStudentModule,
    PdfsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PdfsService],
})
export class AppModule {}
