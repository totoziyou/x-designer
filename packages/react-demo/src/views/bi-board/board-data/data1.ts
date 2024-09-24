
const data = {
    "gridLayoutConfig": {
        "cols": 24,
        "rowHeight": 30,
        "margin": [
            8,
            8
        ],
        "maxRows": "Infinity",
        "containerPadding": [
            4,
            4
        ],
        "containerWidth": 1451
    },
    "items": [
        {
            "id": "055ebd0e-7704-4329-bf85-a46161c361de",
            "widget": "chart",
            "gridLayout": {
                "i": "055ebd0e-7704-4329-bf85-a46161c361de",
                "x": 9,
                "y": 12,
                "w": 10,
                "h": 9,
                "minW": 4,
                "minH": 3
            },
            "isLocked": false,
            "data": {
                "type": "bar",
                "datasource": {
                    "id": "d1"
                },
                "params": {
                    "xField": {
                        "name": "year",
                        "title": "年份"
                    },
                    "yField": {
                        "name": "amount",
                        "title": "金额"
                    }
                }
            },
            "theme": "light"
        },
        {
            "id": "1c5888f5-6909-48ac-ac10-060edd42693a",
            "widget": "image",
            "gridLayout": {
                "i": "1c5888f5-6909-48ac-ac10-060edd42693a",
                "x": 14,
                "y": 0,
                "w": 5,
                "h": 12
            },
            "isLocked": false,
            "data": {
                "url": "http://img.netbian.com/file/2024/0618/small234207dJDho1718725327.jpg",
                "position": "right bottom",
                "cover": "cover",
                "repeat": "no-repeat",
                "bgColor": "#d4ddf2"
            },
            "theme": "light"
        },
        {
            "id": "e8e658c0-e20f-4b11-a17f-fd3044bb1147",
            "widget": "rankings",
            "gridLayout": {
                "i": "e8e658c0-e20f-4b11-a17f-fd3044bb1147",
                "x": 9,
                "y": 0,
                "w": 5,
                "h": 12
            },
            "isLocked": false,
            "data": {},
            "theme": "light"
        }
    ],
    "theme": "light"
}

export default data;