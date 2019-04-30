import DS from './CellArrangementDS';

const ds = new DS();
const cw = 20;
const cn = 2;

test('new cwds', () => {
    ds.getCwds(cw);
    expect(ds[cw].cellHeights).toEqual([]);
});

test('push cell height', () => {
    const ch = 20;
    ds.getCwds(cw).concatCellHeight(ch);
    expect(ds[cw].cellHeights)
        .toEqual([ch]);
});

test('new cnds', () => {
    ds.getCwds(cw).getCnds(cn);
    expect(ds[cw][cn].itemIndexMatrix)
        .toEqual([...Array(cn)].map(() => []));
    expect(ds[cw][cn].getLastCellsItemIndex())
        .toEqual(-1);
});

test('concat item and push offset bottom', () => {
    ds.getCwds(cw).getCnds(cn).concatItemIndex(0);
    ds.getCwds(cw).getCnds(cn).concatOffsetBottom(20);
    ds.getCwds(cw).getCnds(cn).concatItemIndex(1);
    ds.getCwds(cw).getCnds(cn).concatOffsetBottom(30);
    ds.getCwds(cw).getCnds(cn).concatItemIndex(2);
    ds.getCwds(cw).getCnds(cn).concatOffsetBottom(40);
    expect(ds[cw][cn].offsetBottomMatrix)
        .toEqual([[20, 40], [30]]);
    expect(ds[cw][cn].itemIndexMatrix)
        .toEqual([[0, 2], [1]]);
    expect(ds[cw][cn].getColumnHeights())
        .toEqual([40, 30]);
    expect(ds[cw][cn].getShortestColumnHeight())
        .toEqual(30);
    expect(ds[cw][cn].getShortestColumnIndex())
        .toEqual(1);
    expect(ds[cw][cn].getLastCellsItemIndex())
        .toEqual(2);
    expect(ds[cw][cn].getSmallestItemIndexInViewport(10))
        .toEqual(0);
    expect(ds[cw][cn].getSmallestItemIndexInViewport(20))
        .toEqual(1);
    expect(ds[cw][cn].getSmallestItemIndexInViewport(30))
        .toEqual(2);
    expect(ds[cw][cn].getCellsOffsetTop(0))
        .toEqual(0);
    expect(ds[cw][cn].getCellsOffsetTop(1))
        .toEqual(0);
    expect(ds[cw][cn].getCellsOffsetTop(2))
        .toEqual(20);
});

// let cellArrangementDS = {
//     20: { // ColumnWidthDS
//         cellHeights: [],
//         2: { // ColumnNoDS
//             itemIndexMatrix: [[], []],
//             offsetBottomMatrix: [[], []],
//         },
//         3: {}, // ColumnNoDS
//         getCnds: (cn)=>{}
//     },
//     30 : {},
//
//     getCwds: (wiw)=>{},
