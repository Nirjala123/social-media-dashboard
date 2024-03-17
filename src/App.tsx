import CreatePost from './components/CreatePost';
import PostList from './components/PostList';

function App() {
  return (
    <div className="bg-blue-50 p-6 flex flex-col justify-center items-center m-9">
      <CreatePost />
      <PostList />
    </div>
  );
}

export default App;
