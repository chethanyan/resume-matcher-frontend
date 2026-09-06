import { SplitLayout } from './components/layout/SplitLayout';
import { ResumePanel } from './components/resume/ResumePanel';

function App() {
  return (
    <SplitLayout
      left={<ResumePanel />}
      right={
        <div className="text-gray-500">
          Right panel will go here (Match + Catalog)
        </div>
      }
    />
  );
}

export default App;