import Link from 'next/link'
export default function Home({users}) {
  return (
    <div className="container">
      {users.map((user, index) => {
        return (
          <div>
            <Link key={index} href={`/people/[[...username]]`} as={`/people/${user.login}`}>
              <a>{user.login}</a>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export async function getStaticProps() {

  const users = await fetch(`https://api.github.com/users`, {
    headers: {
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
  })
    .then((r) => r.json())
    .then((r) => r);

  return {
    props: { users },
  };
}
