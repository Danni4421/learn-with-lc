
import { auth } from "@/auth";
import Post from "@/components/post";

/** Components */
import Heading1 from "@/components/heading";
import Navbar from "@/components/ui/navigations/navbar";
import Footer from "@/components/footer";
import { FaSearch,FaBook ,FaCalculator,FaAtom,FaFlask,FaLeaf } from 'react-icons/fa';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Flex, Box, Heading, Text, IconButton, Button, Avatar, Image,Badge } from '@chakra-ui/react';


/** Utilities */
import content from "@/utils/content.json";


export default async function Forum() {

  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gray-100 ">
      <Navbar isLanding user={session?.user} />

      <div className="hero mt-24 w-full flex justify-center">
        <div className="container bg-black w-11/12 md:w-4/5 rounded-2xl flex flex-col md:flex-row items-start md:items-start">
          <div className="w-full lg:w-3/5 lg:m-12 p-8">
            <h1 className="text-white text-4xl lg:text-6xl font-bold mb-5 leading-relaxed">
              Jangan ragu,<br /> tanyakan apa saja!
            </h1>
            <p className="text-white text-base mb-6">
              Kami akan memberikan jawaban terbaik! <br /> Mulai mengetik pertanyaan Anda.
            </p>
            <div className="relative">
              <input
                type="text"
                placeholder="Cari pertanyaan..."
                className="w-full p-4 text-black rounded-lg"
              />
              <button className="absolute right-3 top-2 px-4 py-3 rounded-lg bg-black text-white shadow-solid hover:shadow-solid1 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[#DBFF00] transition-transform transition-shadow duration-300 ease-in-out">
                <FaSearch />
              </button>
            </div>
          </div>
          <div className="w-full lg:w-2/5 flex justify-center md:justify-end items-end">
            <Image
              src="../images/ask.svg"
              alt="Ask"
              className="object-contain w-full h-full lg:w-[350px] lg:h-[350px]"
            />
          </div>
        </div>
      </div>

        <Heading1 head="Cari Langsung" subhead="Jelajahi Diskusi,  Temukan hal baru yang mungkin belum pernah Anda temukan" />

        <div className='mt-14 px-8'>
          <div className="flex justify-start">
            <Tabs variant="soft-rounded" colorScheme="black">
              <TabList className="flex space-x-2 mb-6 flex-wrap justify-center gap-4">
                <Tab 
                  _selected={{ color: 'white', bg: 'black', border: '2px solid', borderColor: 'black' }} 
                  color="black" 
                  border="1px solid" 
                  borderColor="black" 
                  p="2"
                  className="flex items-center space-x-2"
                >
                  <FaBook />
                  <span>Semua</span>
                </Tab>
                <Tab 
                  _selected={{ color: 'white', bg: 'black', border: '2px solid', borderColor: 'black' }} 
                  color="black" 
                  border="1px solid" 
                  borderColor="black" 
                  p="2"
                  className="flex items-center space-x-2"
                >
                  <FaCalculator />
                  <span>Matematika</span>
                </Tab>
                <Tab 
                  _selected={{ color: 'white', bg: 'black', border: '2px solid', borderColor: 'black' }} 
                  color="black" 
                  border="1px solid" 
                  borderColor="black" 
                  p="2"
                  className="flex items-center space-x-2"
                >
                  <FaAtom />
                  <span>Fisika</span>
                </Tab>
                <Tab 
                  _selected={{ color: 'white', bg: 'black', border: '2px solid', borderColor: 'black' }} 
                  color="black" 
                  border="1px solid" 
                  borderColor="black" 
                  p="2"
                  className="flex items-center space-x-2"
                >
                  <FaFlask />
                  <span>Kimia</span>
                </Tab>
                <Tab 
                  _selected={{ color: 'white', bg: 'black', border: '2px solid', borderColor: 'black' }} 
                  color="black" 
                  border="1px solid" 
                  borderColor="black" 
                  p="2"
                  className="flex items-center space-x-2"
                >
                  <FaLeaf />
                  <span>Biologi</span>
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Post
                    name="Segun Adebayo"
                    avatarSrc="https://bit.ly/sage-adebayo"
                    role="Pelajar"
                    date="Kamis, 24 Juni 2024"
                    title="Bangun Ruang | Matematika"
                    content="With Chakra UI, I wanted to sync the speed of development with the speed of design. I wanted the developer to be just as excited as the designer to create a screen."
                    badgeColorScheme="green"
                    badgeText="Terjawab"
                    commentName="Rina Kusuma"
                    commentAvatarSrc="https://bit.ly/rina-kusuma"
                    commentRole="Mahasiswa"
                    commentDate="Jumat, 25 Juni 2024"
                    commentContent="Great explanation! It really helps with understanding the concept."
                  />
                  <Post
                    name="Aji Hamdani Wahyu"
                    avatarSrc="https://bit.ly/sage-adebayo"
                    role="Pelajar"
                    date="Kamis, 24 Juni 2024"
                    title="Bangun Ruang | Matematika"
                    content="With Chakra UI, I wanted to sync the speed of development with the speed of design. I wanted the developer to be just as excited as the designer to create a screen."
                    badgeColorScheme="green"
                    badgeText="Terjawab"
                  />
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
                <TabPanel>
                  <p>three!</p>
                </TabPanel>
                <TabPanel>
                  <p>four</p>
                </TabPanel>
                <TabPanel>
                  <p>five</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
          <div className="flex justify-center">
            <Button className="px-4 py-2 rounded-lg bg-black text-white shadow-solid hover:shadow-solid1 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[#DBFF00] hover:bg-black transition-transform transition-shadow duration-300 ease-in-out">
              Muat Lebih Banyak
            </Button>
          </div>
        </div>

      {/* Footer */}
      <Footer
        className="mt-24 bg-slate-50"
        contacts={content.footer.contacts}
        navigations={content.footer.navigations}
        popularCourses={content.footer.popularCourses}
      />
    </main>
  );
}
