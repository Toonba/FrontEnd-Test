function NavItem({ items }) {
  return (
    <>
      <ul>
        {items.map((item) => {
          return (
            <li key={item.name}>
              {item.name} {item.unseen ? <span>{`(${item.unseen})`}</span> : null}{' '}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default NavItem
