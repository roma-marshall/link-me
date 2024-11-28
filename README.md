# Link Me

Technology Stack used: Vue3, Firebase and Tailwind CSS.

## Code snippets
1. Sign up user for the first time and save data to Firebase. We use an shortened email address as our primary username
```javascript
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

const email = ref()
const password = ref()
const auth = getAuth()
const db = getFirestore()
const router = useRouter()

const signUp = async () => {
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value)
    await sendEmailVerification(auth.currentUser)
    await setDoc(doc(db, 'users', auth.currentUser.uid), {
      username: auth.currentUser.email.slice(0, 5),
      description: 'A UFO flew in and posted this caption here',
      title: [],
      link: []
    })
    await router.push('/settings')
  } catch (error) {
    console.log(error.code)
}
```

2. Getting user data from Firebase (Firestore). We use Firestore here because it is more optimal and better scalable
```javascript
import { ref } from 'vue'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

const uid = ref()
const db = getFirestore()

const getUserData = async () => {
  const user = auth.currentUser

  if (user) {
    const uid = user.uid
    const userDoc = await getDoc(doc(db, 'users', uid))

    if (userDoc.exists()) {
      const userData = userDoc.data()
      username.value = userData.username
      description.value = userData.description
      title.value = userData.title
      link.value = userData.link
    } else {
      console.log('No user data was found')
    }
  }
}
```

3. Updating (saving) user data (e.g. links to social networks)
```javascript
import { getAuth } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

const auth = getAuth()
const db = getFirestore()

const saveUserData = async () => {
  const user = auth.currentUser
  const hasEmptyStringTitle = title.value.some(item => item === '')
  const hasEmptyStringLink = link.value.some(item => item === '')

  if (user && (!hasEmptyStringTitle && !hasEmptyStringLink)) {
    const uid = user.uid

    await setDoc(doc(db, 'users', uid), {
      username: username.value,
      description: description.value,
      title: title.value,
      link: link.value
    })
  }
}
```

## Recommended Installation

```
git clone https://github.com/roma-marshall/link-me.git
cd link-me
npm run dev
```

## License

MIT License
