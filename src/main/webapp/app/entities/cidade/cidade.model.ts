const enum UF {
    'AC',
    'PR',
    'SP',
    'SC'
};
export class Cidade {
    constructor(
        public id?: number,
        public nome?: string,
        public estado?: UF,
    ) { }
}
