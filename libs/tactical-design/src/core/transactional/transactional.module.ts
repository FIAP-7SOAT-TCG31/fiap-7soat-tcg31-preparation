import { ConfigurableModuleBuilder, Module, Type } from '@nestjs/common';
import { TransactionManager } from './transaction.manager';

export type TransactionalModuleExtraOptions = {
  TransactionManagerAdapter: Type<TransactionManager>;
};

const { ConfigurableModuleClass } = new ConfigurableModuleBuilder<any>()
  .setFactoryMethodName('createTransactionalOptions')
  .setExtras(null, (definitions, extras: TransactionalModuleExtraOptions) => {
    const { TransactionManagerAdapter } = extras;
    return {
      ...definitions,
      providers: [
        ...(definitions.providers || []),
        {
          provide: TransactionManager.name,
          useClass: TransactionManagerAdapter,
        },
      ],
      exports: [...(definitions.exports || []), TransactionManager.name],
    };
  })
  .build();

@Module({})
export class TransactionalModule extends ConfigurableModuleClass {}
