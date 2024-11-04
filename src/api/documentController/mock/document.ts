import { Document } from '@/types/sharedTypes'

const document: Document = {
  "id": 1,
  "user": {
    "id": 1,
    "name": "admin",
    "surname": "admin",
    "email": "admin",
    "roles": [
      {
        "id": 1,
        "name": "ADMIN"
      }
    ]
  },
  "documentType": {
    "id": 1,
    "name": "testType",
    "attributes": [
      {
        "id": 1,
        "name": "testAttr1",
        "required": false
      },
      {
        "id": 2,
        "name": "testAttr2",
        "required": true
      }
    ]
  },
  "documentVersions": [
    {
      "id": 1,
      "versionId": 1,
      "title": "hw.txt",
      "description": "test",
      "createdAt": "2024-12-12T23:59:59.425",
      "values": [
        {
          "attributeName": "testAttr2",
          "value": "52"
        }
      ],
      "base64Content": "SGVsbG8sIFdvcmxkIQ==",
      "signatures": [
        {
          "hash": 1322131231,
          "placeholderTitle": "testPlaceholder",
          "user": {
            "id": 1,
            "name": "admin",
            "surname": "admin",
            "email": "admin",
            "roles": [
              {
                "id": 1,
                "name": "ADMIN"
              }
            ]
          }
        }
      ]
    }
  ]
}

export default Promise.resolve(() => document)
