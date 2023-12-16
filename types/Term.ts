export interface BaseModel {
    id: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface Term  extends BaseModel {
    name: string;
    parentId?: number;
    groupId?: number;
}

export interface GqlVariables {
    where: any;
    limit?: number;
    offset?: number;
    orderBy?: any;
    [key: string]: any;
}