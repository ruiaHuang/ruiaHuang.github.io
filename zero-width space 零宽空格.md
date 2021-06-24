## 零宽空格 （看不见却占位置的字符）

**零宽空格**（**zero-width space, ZWSP**）是一种不可打印的[Unicode](https://zh.wikipedia.org/wiki/Unicode)字符，用于可能需要换行处。

在[Unicode](https://zh.wikipedia.org/wiki/Unicode)中，该字符为U+200B 零宽空格 ，HTML：`&#8203`

以下示例中，相邻两个不同的单词之间夹有一个零宽空格。

```
Lorem​Ipsum​Dolor​Sit​Amet​Consectetur​Adipiscing​Elit​Sed​Do​Eiusmod​Tempor​Incididunt​Ut​Labore​Et​Dolore​Magna​Aliqua​Ut​Enim​Ad​Minim​Veniam​Quis​Nostrud​Exercitation​Ullamco​Laboris​Nisi​Ut​Aliquip​Ex​Ea​Commodo​Consequat​Duis​Aute​Irure​Dolor​In​Reprehenderit​In​Voluptate​Velit​Esse​Cillum​Dolore​Eu​Fugiat​Nulla​Pariatur​Excepteur​Sint​Occaecat​Cupidatat​Non​Proident​Sunt​In​Culpa​Qui​Officia​Deserunt​Mollit​Anim​Id​Est​Laborum
```

而下列示例中的单词之间没有一个零宽空格。

```
LoremIpsumDolorSitAmetConsecteturAdipiscingElitSedDoEiusmodTemporIncididuntUtLaboreEtDoloreMagnaAliquaUtEnimAdMinimVeniamQuisNostrudExercitationUllamcoLaborisNisiUtAliquipExEaCommodoConsequatDuisAuteIrureDolorInReprehenderitInVoluptateVelitEsseCillumDoloreEuFugiatNullaPariaturExcepteurSintOccaecatCupidatatNonProidentSuntInCulpaQuiOfficiaDeseruntMollitAnimIdEstLaborum
```

通常，零宽空格不会显示出来，但是有些软件（如QQ）可以显示

### 解决方案

```
1. 替换
	str.replace(/[\u200B-\u200D\uFEFF]/g, '');
2.
	str.replace(/\u8203/g, '');
    str.replace(/\uB200/g'');
3.
	str.replace(/(^[\s\u200b]*|[\s\u200b]*$)/g, '')
4. 先获取正常字符，然后join
	let res = str.match(/\w/g);
	str = res.join('');
```

### 示例

```
let str = 'a​b​c';
console.log(str.length);	// 5
str = str.replace(/[\u200B-\u200D\uFEFF]/g, '')
console.log(str.length)		// 3
```

