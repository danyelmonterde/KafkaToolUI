export interface RegisterBrokerRequestBody {
  brokerName: string;
  brokerAddress: string;
  schemaRegistryProperties:{
    schemaRegistryUrlList: string [];
  };
}

export interface RegisterBrokerResponseBody{
  
}