export default function Image({ image_url, title }) {
  console.log(title);
  return (
    <div>
      <img src={image_url} alt="Graphs" />
    </div>
  );
}
