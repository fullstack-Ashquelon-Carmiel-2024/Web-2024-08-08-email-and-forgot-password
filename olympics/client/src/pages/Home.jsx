import {Button as ShadcnButton} from '../components/ui/button';

const Home = ({user}) => {
    
  return (
    <div className="">
        <h1 className="text-indigo-600 font-light text-3xl">Home, Sweet Home ...</h1>
        <h2 className="text-indigo-600 font-light text-2xl">{user.name}, welcome back!
        Your role is {user.role}</h2>
        <h3>How to install shadcn on Vite + React JS + Tailwind CSS</h3>
        <div className="flex">

            <ol className="bg-orange-400 text-indigo-950 list-decimal list-outside p-7">
                <li>There should be tsconfig.json,<br/>
                    like this.<br/>
                    Yes, ts - it's just for shadcn init to work</li>
            </ol>
            <div className="code">
                <pre className="bg-slate-800 text-indigo-400">
                    {code1}
                </pre>
            </div>
        </div>
        <h3>How to get button shadcn component</h3>
        <ShadcnButton>I am ShadcnButton</ShadcnButton>
        <ShadcnButton variant="secondary">I am Secondary ShadcnButton</ShadcnButton>
        <ShadcnButton variant="destructive">I am Destructive ShadcnButton</ShadcnButton>
        <ShadcnButton variant="outline">I am Outline ShadcnButton</ShadcnButton>
    </div>
  )
}

var code1 = `tsconfig.json:
  {
    "compilerOptions": {
      "lib": ["dom", "dom.iterable"],
      "allowJs": true,
      "skipLibCheck": true,
      "strict": true,
      "noEmit": true,
      "esModuleInterop": true,
      "module": "esnext",
      "moduleResolution": "bundler",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "jsx": "preserve",
      "incremental": true,
      "plugins": [
        {
          "name": "next"
        }
      ],
      "paths": {
        "@/*": ["./src/*"]
      }
    },
    "include": ["**/*.js", "**/*.tsx","**/*.ts", "**/*.tsx"],
    "exclude": ["node_modules"]
  }`

export default Home